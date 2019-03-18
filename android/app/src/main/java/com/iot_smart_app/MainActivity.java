package com.iot_smart_app;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;
import com.tuanpm.RCTSmartconfig.RCTSmartconfigPackage;
import com.tuanpm.RCTSmartconfig.RCTSmartconfigPackage;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "iot_smart_app";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this, true);
        super.onCreate(savedInstanceState);
        // MobclickAgent.setSessionContinueMillis(1000);
        // MobclickAgent.setScenarioType(this, EScenarioType.E_DUM_NORMAL);
    }
}
