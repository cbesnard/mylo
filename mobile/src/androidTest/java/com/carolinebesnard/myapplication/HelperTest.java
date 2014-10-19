package com.carolinebesnard.myapplication;

import android.test.AndroidTestCase;

import com.carolinebesnard.mylo.Helper;

import junit.framework.Assert;

/**
 * Created by carolinebesnard on 11/10/2014.
 */
public class HelperTest extends AndroidTestCase {

    @Override
    public void setUp() {
    }

    @Override
    public void tearDown() {
    }

    public void test1() {
        Assert.assertEquals(null, Helper.parseShareIntentText(""));
        Assert.assertEquals("success", Helper.parseShareIntentText("Le motel http://goo.gl/maps/tzq1G zan dkz"));
        Assert.assertEquals("success", Helper.parseShareIntentText("Le motel \n http://goo.gl/maps/tzq1G"));
        Assert.assertEquals(null, Helper.parseShareIntentText("Yo moma"));
        Assert.assertEquals("success", Helper.parseShareIntentText("http://goo.gl/maps/tzq1G"));
    }


}
