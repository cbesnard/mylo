package com.carolinebesnard.mylo;

import android.app.backup.BackupAgentHelper;
import android.app.backup.BackupDataInput;
import android.app.backup.BackupDataOutput;
import android.app.backup.FileBackupHelper;
import android.os.Environment;
import android.os.ParcelFileDescriptor;
import android.util.Log;

import java.io.File;
import java.io.IOException;

/**
 * Created by fire on 07/10/14.
 */
public class MyloBackupAgentHelper extends BackupAgentHelper {

    public final static Object locationDataLock = new Object();

    public final static String LOCATION_FILE_NAME = "data.txt";

    private static final String LOCATION_BACKUP_KEY = "myloLocation";
    private static final String TAG = MyloBackupAgentHelper.class.getSimpleName();

    @Override
    public void onCreate() {
        Log.i(TAG, "Backup agent creation");
        final String root = Environment.getExternalStorageDirectory().toString();

        FileBackupHelper fileBackupHelper = new FileBackupHelper(this, LOCATION_FILE_NAME);
        addHelper(LOCATION_BACKUP_KEY, fileBackupHelper);
    }

    @Override
    public void onBackup(ParcelFileDescriptor oldState, BackupDataOutput data, ParcelFileDescriptor newState) throws IOException {
        Log.d(TAG, "Before Backup");
        synchronized (MyloBackupAgentHelper.locationDataLock) {
            Log.d(TAG, "Backupping");
            super.onBackup(oldState, data, newState);
        }
        Log.d(TAG, "After Backup");
    }

    @Override
    public void onRestore(BackupDataInput data, int appVersionCode, ParcelFileDescriptor newState) throws IOException {
        Log.d(TAG, "Before Restore");
        synchronized (MyloBackupAgentHelper.locationDataLock) {
            Log.d(TAG, "Restoring");
            super.onRestore(data, appVersionCode, newState);
        }
        Log.d(TAG, "After Restore");
    }
}
