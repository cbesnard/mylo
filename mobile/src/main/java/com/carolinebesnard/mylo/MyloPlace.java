package com.carolinebesnard.mylo;

import android.location.Address;

import java.util.Locale;

/**
 * Created by carolinebesnard on 13/10/2014.
 */
public class MyloPlace extends Address {

    private String address;
    private Boolean GPS;

    /**
     * Constructs a new Address object set to the given Locale and with all
     * other fields initialized to null or false.
     *
     * @param locale
     */
    public MyloPlace(Locale locale) {
        super(locale);
        this.GPS=false;
    }

    public String getAddress(){
        return this.address;
    }

    public void setAddress(String addr){
         this.address = addr;
    }

    public Boolean getGPS(){
        return this.GPS;
    }

    public void setGPS(Boolean bool){
        this.GPS = bool;
    }

}
