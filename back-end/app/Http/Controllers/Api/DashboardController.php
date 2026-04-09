<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\DemandeDirecte;
use App\Models\Message;
use App\Models\OffreTravail;
use App\Models\Paiement;
use App\Models\Proposition;
use App\Models\Service;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */






    public function stats()
    {
        $totalClients = User::whereHas('roles', function ($q) {
            $q->where('name', 'client');
        })->count();

        $totalVerifiedArtisans = User::whereHas('roles', function ($q) {
            $q->where('name', 'artisan');
        })
            ->whereHas('artisan', function ($q) {
                $q->where('is_verified', true);
            })->count();

        $totalArtisans = User::whereHas('roles', function ($q) {
            $q->where('name', 'artisan');
        })->count();

        $totalApprovedServices = Service::where('statut', 'approuve')->count();

        $totalPendingServices = Service::where('statut', 'en attente')->count();
        $totalPendingPropositions = Proposition::where('statut', 'en attente')->count();
        $totalAcceptedPropositions = Proposition::where('statut', 'accepte')->count();
        $totalOffreTravailsOvert = OffreTravail::where('statut', 'ouvert')->count();
        $totalDemandeDirectesAccepted = DemandeDirecte::where('statut', 'accepte')->count();
        $totalserviceOffreIsCompleted = DemandeDirecte::where('is_completed', true)->count() + Proposition::where('is_completed', true)->count();
        $financials = DB::table('paiements')
            ->select(
                DB::raw('SUM(CAST(montant_total AS DECIMAL)) as total_ca'),
                DB::raw('SUM(CAST(commission_admin AS DECIMAL)) as total_profit')
            )
            ->whereIn('statut', ['released', 'completed'])
            ->first();
        $monthlyRevenue = DB::table('paiements')
            ->select(
                DB::raw("TO_CHAR(paid_at, 'YYYY-MM') as month"),
                DB::raw('SUM(CAST(montant_total AS DECIMAL)) as total_amount'),
                DB::raw('SUM(CAST(commission_admin AS DECIMAL)) as net_profit')
            )
            ->where('paid_at', '>=', now()->subMonths(6))
            ->whereIn('statut', ['released', 'completed'])
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->get();
        $dailyRevenue = DB::table('paiements')
            ->select(
                DB::raw("TO_CHAR(paid_at, 'YYYY-MM-DD') as day"),
                DB::raw('SUM(CAST(montant_total AS DECIMAL)) as total_amount'),
                DB::raw('SUM(CAST(commission_admin AS DECIMAL)) as net_profit')
            )
            ->where('paid_at', '>=', now()->subDays(30))
            ->whereIn('statut', ['released', 'completed'])
            ->groupBy('day')
            ->orderBy('day', 'asc')
            ->get();
        $conversationsByType = Conversation::select('conversable_type', DB::raw('count(*) as count'))
            ->groupBy('conversable_type')
            ->get()
            ->mapWithKeys(function ($item) {
                $className = str_replace('App\\Models\\', '', $item->conversable_type);
                return [$className => $item->count];
            });

        $monthlyStats = Conversation::select(
            DB::raw("TO_CHAR(created_at, 'YYYY-MM') as month"),
            DB::raw('count(id) as total')
        )
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->get();

        $avgRating = DB::table('evaluations')->avg('rating') ?? 0;

        return response()->json([
            'status' => 'success',
            'stats' => [
                'overview' => [
                    'total_users' => User::count(),
                    'clients' => $totalClients,
                    'total_artisans' => $totalArtisans,
                    'verified_artisans' => $totalVerifiedArtisans,
                    'total_services' => Service::count(),
                    'approved_services' => $totalApprovedServices,
                    'total_conversations' => Conversation::count(),
                    'total_pending_services' => $totalPendingServices,
                    'total_pending_propositions' => $totalPendingPropositions,
                    'total_accepted_propositions' => $totalAcceptedPropositions,
                    'total_offre_travails' => OffreTravail::count(),
                    'total_demande_directes' => DemandeDirecte::count(),
                    'total_offre_travails_overt' => $totalOffreTravailsOvert,
                    'total_demande_directes_accepted' => $totalDemandeDirectesAccepted,
                    'total_service_offre_is_completed' => $totalserviceOffreIsCompleted

                ],
                'financials' => [
                    'total_volume' => round($financials->total_ca ?? 0, 2),
                    'net_profit' => round($financials->total_profit ?? 0, 2),
                    'currency' => 'MAD'
                ],
                'activity' => [
                    'by_type' => $conversationsByType,
                    'monthly_chart' => $monthlyStats,
                    'monthly_revenue' => $monthlyRevenue,
                    'daily_revenue' => $dailyRevenue,
                    'average_rating' => round($avgRating, 1)
                ]
            ]
        ]);
    }

    public function artisanStats()
    {

        $artisanId = auth()->user()->id;

        $totalPropositions = Proposition::where('artisan_id', $artisanId)->count();
        $acceptedPropositions = Proposition::where('artisan_id', $artisanId)
            ->where('statut', 'accepte')->count();
        $totalService = Service::where('artisan_id', $artisanId)->count();
        $completedJobs = Proposition::where('artisan_id', $artisanId)->where('is_completed', true)->count();
        $totalDemandeDirectesCompleted =    DemandeDirecte::where('is_completed', true)->whereHas('service', function ($q) use ($artisanId) {
            $q->where('artisan_id', $artisanId);
        })->count();

        $dailyEarnings = Paiement::whereHas('conversation', function ($q) use ($artisanId) {
            $q->whereHasMorph(
                'conversable',
                [DemandeDirecte::class, Proposition::class],
                function ($subQuery, $type) use ($artisanId) {
                    if ($type === DemandeDirecte::class) {
                        $subQuery->whereHas('service', function ($q) use ($artisanId) {
                            $q->where('artisan_id', $artisanId);
                        });
                    } elseif ($type === Proposition::class) {
                        $subQuery->where('artisan_id', $artisanId);
                    }
                }
            );
        })
            ->whereIn('statut', ['released', 'completed'])
            ->where('paid_at', '>=', now()->subDays(30))
            ->select(
                DB::raw("TO_CHAR(paid_at, 'YYYY-MM-DD') as day"),
                DB::raw('SUM(CAST(montant_total AS DECIMAL) - CAST(commission_admin AS DECIMAL)) as earnings')
            )
            ->groupBy('day')
            ->orderBy('day', 'asc')
            ->get();

        return response()->json([
            'status' => 'success',
            'stats' => [
                'overview' => [
                    'total_services' => $totalService,
                    'total_propositions' => $totalPropositions,
                    'accepted_propositions' => $acceptedPropositions,
                    'completed_jobs' => $completedJobs,
                    'total_demande_directes_completed' => $totalDemandeDirectesCompleted,
                    'all_completed_tasks' => $completedJobs + $totalDemandeDirectesCompleted
                ],
                'financials' => [
                    'total_earned' => round($financials->total_earned ?? 0, 2),
                    'total_payments_count' => $financials->total_payments_count ?? 0,
                    'currency' => 'MAD'
                ],
                'charts' => [
                    'daily_revenue' => $dailyEarnings
                ]
            ]
        ]);
    }
}
