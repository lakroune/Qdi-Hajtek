<?php

namespace App\Http\Controllers;

use App\DTO\PaymentDTO;
use App\Http\Requests\PaymentRequest;
use App\Services\PaymentService;
use Illuminate\Http\Request;
use Stripe\PaymentIntent;
use Stripe\Stripe;

class PaymentController extends Controller
{

    public function __construct(private PaymentService $paymentService)
    {
        //
    }
    /**
     * Display a listing of the resource.
     */
    public function initiate(PaymentRequest $request) {
        $dto = PaymentDTO::fromRequest($request);
        return $this->paymentService->initiatePayment($dto->toArray());
    }
}
