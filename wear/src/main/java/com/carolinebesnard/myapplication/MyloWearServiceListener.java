package com.carolinebesnard.myapplication;

import android.os.Handler;
import android.util.Log;

import com.google.android.gms.wearable.MessageEvent;
import com.google.android.gms.wearable.WearableListenerService;


/**
 * Created by carolinebesnard on 11/08/2014.
 */
public class MyloWearServiceListener extends WearableListenerService {
    static public MyActivity activity;

    @Override
    public void onCreate(){
        super.onCreate();
        Log.i("on create called", "in myloWearServiceListener");
    }

    @Override
    public void onMessageReceived(MessageEvent messageEvent){
        super.onMessageReceived(messageEvent);
        //messageEvent.getData()[0] == 1
        Log.i("in myloWearServiceListener onMessageReceived !!!","message:"+messageEvent);
        AnimatedView.doneLoading=true;
        //AnimatedView.success=true;
        if (activity!=null){
            if(messageEvent.getData()[0] == 1){
                activity.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        activity.endOfLoad();
                    }
                });
            }
        }
    }
}
