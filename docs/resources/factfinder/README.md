#FactFinder

The following [FactFinder export steps are by Mike Bostock](https://bost.ocks.org/mike/bubble-map/)  

1. Go to factfinder2.census.gov.  
2. Find where it says “American Community Survey” and click “get data »”.  
3. Click the blue “Geographies” button on the left.  
4. In the pop-up, select “..... County - 050” in the “geographic type” menu.  
5. Select “All Counties within United States” in the “geographic areas” box.  
6. Click the “ADD TO YOUR SELECTIONS” button.  
7. Click “CLOSE” to dismiss the pop-up.  
8. Click the blue “Topics” button on the left.  
9. In the pop-up, expand the “People” submenu.  
10. Expand the “Basic Count/Estimate” submenu.  
11. Click “Population Total”.  
12. Click “CLOSE” to dismiss the pop-up.  
13. In the table, click on the most recent ACS 5-year estimate named “TOTAL POPULATION”.  
14. On the next page, click the “Download” link under “Actions”.  
15. In the pop-up, click “OK”.  
16. Wait for it to “build” your file.  
17. When it’s ready, click “DOWNLOAD”.  
18. Finally, expand the downloaded zip file (ACS_12_5YR_B01003.zip).  
<br>

##Add notes here on any custom step you make.  

<b>Steps for downloading the income data to build our zcta (zipcode) analysis tool:</b>  

[American Community Survey (ACS) Download Center](https://factfinder.census.gov/faces/nav/jsf/pages/download_center.xhtml)  
(Screenshots in steps folder.)

<b>Choose one of these (seems to be limit to one download set at a time.)</b>  
S1901 - Income  
B02001 - Race  
S0101 - Age and Sex

The income dataset contains over 100 types of income.  
Our 19.5 MB income source file resides at [prep/income/2017/aff_download/ACS_17_5YR_S1901_with_ann.csv](../../../prep/income/2017/aff_download/ACS_17_5YR_S1901_with_ann.csv)



##Other Notes  

CensusReporter.org cleans up FactFinder data to provide an API
https://censusreporter.org/profiles/16000US1304000-atlanta-ga/

We are using the [ZCTA Crosswalk](https://www.census.gov/geo/reference/zctas.html) file to relate 41,160 zip codes to 33,120 census tabulation areas.  

Search for income and demographics:  
https://zipwho.com  

Census parameter names as json  
https://api.census.gov/data/2017/acs/acs5/variables.json  

API URL examples
https://api.census.gov/data/2017/acs/acsse/examples.html  

Detailed Training on Using API  
https://www.census.gov/content/dam/Census/programs-surveys/acs/guidance/training-presentations/20180614_API.pdf  

## Steps for downloading ZCTA