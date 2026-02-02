"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    paypal?: {
      Buttons: (options: {
        createOrder: () => Promise<string>;
        onApprove: (data: { orderID: string }) => Promise<void>;
        onError?: (err: Error) => void;
        onCancel?: () => void;
      }) => {
        render: (element: HTMLElement) => Promise<void>;
      };
    };
  }
}

interface PayPalButtonProps {
  onCreateOrder: () => Promise<string>;
  onApprove: (orderId: string) => Promise<void>;
  onError?: (error: Error) => void;
  onCancel?: () => void;
  disabled?: boolean;
}

export default function PayPalButton({
  onCreateOrder,
  onApprove,
  onError,
  onCancel,
  disabled = false,
}: PayPalButtonProps) {
  const paypalRef = useRef<HTMLDivElement>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buttonRendered, setButtonRendered] = useState(false);

  // Load PayPal SDK
  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

    if (!clientId) {
      console.error("PayPal Client ID not configured");
      setLoading(false);
      return;
    }

    // Check if SDK is already loaded
    if (window.paypal) {
      setSdkReady(true);
      setLoading(false);
      return;
    }

    // Check if script already exists
    const existingScript = document.querySelector(
      'script[src*="paypal.com/sdk/js"]'
    );
    if (existingScript) {
      existingScript.addEventListener("load", () => {
        setSdkReady(true);
        setLoading(false);
      });
      return;
    }

    // Load PayPal SDK
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
      setLoading(false);
    };
    script.onerror = () => {
      console.error("Failed to load PayPal SDK");
      setLoading(false);
    };
    document.body.appendChild(script);
  }, []);

  // Render PayPal button
  useEffect(() => {
    if (!sdkReady || !window.paypal || !paypalRef.current || disabled) {
      return;
    }

    // Clear previous button
    if (paypalRef.current) {
      paypalRef.current.innerHTML = "";
    }

    setButtonRendered(false);

    window.paypal
      .Buttons({
        createOrder: async () => {
          try {
            const orderId = await onCreateOrder();
            return orderId;
          } catch (error) {
            console.error("Create order error:", error);
            throw error;
          }
        },
        onApprove: async (data) => {
          try {
            await onApprove(data.orderID);
          } catch (error) {
            console.error("Approve error:", error);
            if (onError) onError(error as Error);
          }
        },
        onError: (err) => {
          console.error("PayPal error:", err);
          if (onError) onError(err);
        },
        onCancel: () => {
          console.log("Payment cancelled");
          if (onCancel) onCancel();
        },
      })
      .render(paypalRef.current)
      .then(() => {
        setButtonRendered(true);
      })
      .catch((err: Error) => {
        console.error("PayPal button render error:", err);
      });
  }, [sdkReady, disabled, onCreateOrder, onApprove, onError, onCancel]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900"></div>
        <span className="ml-2 text-gray-600">Loading PayPal...</span>
      </div>
    );
  }

  if (!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID) {
    return (
      <div className="text-center py-4 text-red-500">
        PayPal is not configured. Please contact support.
      </div>
    );
  }

  if (disabled) {
    return (
      <button
        disabled
        className="w-full py-4 rounded-lg font-medium bg-gray-300 text-gray-500 cursor-not-allowed"
      >
        Select options to continue
      </button>
    );
  }

  return (
    <div>
      <div ref={paypalRef} className="w-full min-h-[45px]" />
      {!buttonRendered && sdkReady && (
        <div className="flex items-center justify-center py-2">
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-400"></div>
        </div>
      )}
    </div>
  );
}
