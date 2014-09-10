package com.carolinebesnard.myapplication;

import android.os.Handler;
import android.util.Log;

import com.google.android.gms.wearable.MessageEvent;
import com.google.android.gms.wearable.Node;
import com.google.android.gms.wearable.WearableListenerService;


/**
 * Created by carolinebesnard on 11/08/2014.
 */
public class MyloWearServiceListener extends WearableListenerService {
    static public MyActivity activity;
    private static final String TAG = MyloWearServiceListener.class.getSimpleName();

    @Override
    public void onCreate(){
        super.onCreate();
        Log.i(TAG, "On create called");
    }

    @Override
    public void onMessageReceived(MessageEvent messageEvent){
        super.onMessageReceived(messageEvent);
        //messageEvent.getData()[0] == 1
        Log.i(TAG,"In on messageReceived: message="+messageEvent);
        AnimatedView.doneLoading=true;
        //AnimatedView.success=true;
        if (activity!=null){
            if(messageEvent.getData()[0] == 1){
                Log.i(TAG, "Add new loc SUCCESS");
                activity.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        activity.endOfLoad();
                    }
                });
            }else {
                Log.i(TAG, "ERROR: couldn't add new loc");
                //Sorry, your position couldn't be found! Try again later :)
                activity.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        activity.addErrorDisplay();
                    }
                });
            }
        }else{ Log.i(TAG,"Activity is null");}
    }

    /*@Override
    public void onPeerConnected (Node peer){
        super.onPeerConnected(peer);
        MyActivity.deviceIsConnected = true;
    }

    @Override
    public void onPeerDisconnected (Node peer){
        super.onPeerDisconnected(peer);
        MyActivity.deviceIsConnected = false;
    }*/
}
