<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReportRequest;
use App\Models\Artisan;
use App\Services\ArtisanService;
use Exception;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function __construct(private ArtisanService $artisanService)
    {
        //
    }
    public function index()
    {

        $reports = $this->artisanService->getReportArtisans();
        return response()->json([
            'message' => 'Artisans found successfully',
            'data' =>  $reports
        ]);
    }
    public function report(ReportRequest $request,  $artisanId)
    {

        $artisan = $this->artisanService->reportArtisan($request->all(), (int) $artisanId);
        return response()->json([
            'success' =>  $artisan ? true : false,
            'message' => $artisan ? 'Artisan reported successfully' : 'Artisan not found',
            'data' => $artisan
        ], 201);
    }


    // mark report as resolved
    public function resolve(Request $request, $artisanId, $clientId)
    {
        try {
            $artisan = Artisan::findOrFail($artisanId);

            $artisan->reports()->updateExistingPivot($clientId, [
                'status' => 'resolved'
            ]);

            return response()->json([
                'message' => 'Report marked as resolved successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error resolving report'], 500);
        }
    }

    // mark report as dismissed
    public function dismiss(Request $request, $artisanId, $clientId)
    {
        try {
            $artisan = Artisan::findOrFail($artisanId);

            $artisan->reports()->updateExistingPivot($clientId, [
                'status' => ''
            ]);

            return response()->json([
                'message' => 'Signalement rejeté avec succès'
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error dismissing report'], 500);
        }
    }
}
