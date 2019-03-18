package com.iot_smart_app;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.peel.react.TcpSocketsModule;
import me.listenzz.modal.TranslucentModalReactPackage;
import ca.jaysoo.extradimensions.ExtraDimensionsPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.beefe.picker.PickerViewPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.pusherman.networkinfo.RNNetworkInfoPackage;
import com.tuanpm.RCTSmartconfig.RCTSmartconfigPackage;
import com.tadasr.IOTWifi.IOTWifiPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import org.devio.rn.splashscreen.SplashScreenReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new TcpSocketsModule(),
            new TranslucentModalReactPackage(),
            new ExtraDimensionsPackage(),
            new PickerPackage(),
            new RNI18nPackage(),
            new RNDeviceInfo(),
            new PickerViewPackage(),
            new SplashScreenReactPackage(),
            new RNNetworkInfoPackage(),
            new RCTSmartconfigPackage(),
            new IOTWifiPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
