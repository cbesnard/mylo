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
    static public final String PATH_STRING = "MYLO/ADD_NEW_LOC";
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
            if(PATH_STRING.equals(messageEvent.getPath()) && messageEvent.getData()[0] == 1){
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
                        activity.addErrorDisplay(MyActivity.AddLocErrorString);
                    }
                });
            }
        }else{ Log.i(TAG,"Activity is null");}
    }
}
