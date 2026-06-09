"use client";

import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { getFirebaseConfig, isFirebaseAnalyticsEnabled } from "./config";

let analyticsPromise: Promise<Analytics | null> | undefined;

export function getFirebaseApp(): FirebaseApp {
  return getApps().length > 0 ? getApp() : initializeApp(getFirebaseConfig());
}

export function initializeFirebaseAnalytics(): Promise<Analytics | null> {
  if (!isFirebaseAnalyticsEnabled()) {
    return Promise.resolve(null);
  }

  analyticsPromise ??= isSupported().then((supported) => {
    if (!supported) {
      return null;
    }

    return getAnalytics(getFirebaseApp());
  });

  return analyticsPromise;
}
