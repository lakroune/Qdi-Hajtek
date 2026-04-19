<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReportRequest;
use App\Models\Artisan;
use App\Services\ArtisanService;
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
            'data' => $reports
        ]);
    }
    public function report(ReportRequest $request,  $artisanId)
    {
        $request->validate([
            'raison' => 'required|string|min:1'
        ]);

        $artisan = $this->artisanService->reportArtisan($request->raison, (int) $artisanId);
        return response()->json([
            'success' =>  $artisan ? true : false,
            'message' => $artisan ? 'Artisan reported successfully' : 'Artisan not found',
            'data' => $artisan
        ], 201);
    }
}
