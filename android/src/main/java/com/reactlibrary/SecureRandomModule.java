package com.crypho.securerandom;

import java.security.SecureRandom;
import android.util.Base64;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;


public class SecureRandomModule extends ReactContextBaseJavaModule {

    SecureRandom prng;

    private final ReactApplicationContext reactContext;

    public SecureRandomModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        prng = new SecureRandom();
    }

    @Override
    public String getName() {
        return "SecureRandom";
    }

    @ReactMethod
    public void randomBytesAsync(int length, final Promise promise) {
        byte[] output = new byte[length];
        prng.nextBytes(output);
        promise.resolve(Base64.encodeToString(output, Base64.NO_WRAP));
    }
}
