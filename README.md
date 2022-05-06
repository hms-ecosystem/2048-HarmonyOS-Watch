# 2048-HarmonyOS-Watch

# Introduction
This demo provides the network speed test on Huawei HarmonyOS Watch 3. When the watch is connected to an Android or HarmonyOS phone that has Huawei Health App installed through Bluetooth, the demo app measures the download speed from a xxMB source file via the Bluetooth connection. On the other hand, when the watch is connected to WiFi, the demo app measures the download speed from the source file via the WiFi network.      

# Installation requirements
Install Huawei DevEco Studio and set up the DevEco Studio development environment. The DevEco Studio development environment needs to depend on the network environment. It needs to be connected to the network to ensure the normal use of the tool.The development environment can be configured according to the following two situations: 1) If you can directly access the Internet, just download the HarmonyOS SDK; 2) If the network cannot access the Internet directly, it can be accessed through a proxy server • Generate secret key and apply for certificate

# User guide 
Download this Project and open DevEco Studio, click File> Open> Then select and open this Project • Click Build> Build App(s)/Hap(s)>Build Debug Hap(s) to compile the hap package.  Then Click Run> Run 'entry' to run the hap package.
Note that you can choose to run the hap package on the simulator or the Huawei watch 3. If you run it on the watch, you need to configure the signature and certificate information in the project's File> Project Structure> Modules> Signing Configs.

You need to add a download source file in the public static String downloadFile = " "; //TODO replace with a URL to download, in entry/src/main/.../slice/MainAbilitySlice.java

# License
The demo code is licensed under the Apache License, version 2.0.
All copyright belong to Lolay Inc.

# Screenshots of demo

<img src="https://user-images.githubusercontent.com/97313676/167052541-eabb09b4-1657-4ff8-8ab4-579926a55cb4.png" width="200" height="240">  <img src="https://user-images.githubusercontent.com/97313676/167052557-fffdfd7a-c05f-4ded-8eb2-3328900c15ac.png" width="200" height="240">  <img src="https://user-images.githubusercontent.com/97313676/167055245-74ae28aa-bd7f-4dab-93ec-6ea4a4e0b965.png" width="200" height="240">
