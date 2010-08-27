import urllib.request
import xml.dom.minidom
import xml.dom
import time
import threading

class Station(threading.Thread):
    myStationId = -1
    numBikes  = ""
    numSpaces = ""
    
    def __init__(self, inputId):
        #print("init:" + str(inputId))
        self.myStationId = inputId
        threading.Thread.__init__(self)
    
    def updateFromWeb(self):
        try:
            stationInfoBaseUrl = 'http://www.dublinbikes.ie/service/stationdetails/'
            generatedUrl = stationInfoBaseUrl + str(self.myStationId)
            self.log(generatedUrl)
            f = urllib.request.urlopen(generatedUrl)
            #print(f.read())
            doc = xml.dom.minidom.parseString(f.read())
            
            self.numBikes = doc.getElementsByTagName("available")[0].firstChild.nodeValue
            self.numSpaces = doc.getElementsByTagName("free")[0].firstChild.nodeValue
        except:
            self.log("Error retrieving data from web")
            self.numBikes = "-1"
            self.numSpaces = "-1"
        
    def printValues(self):
        self.log("Bikes:" + self.numBikes)
        self.log("Spaces:" + self.numSpaces)
    
    def run(self):
        while(1):
            try:
                self.updateFromWeb()
                self.printValues()
                self.log("sleep for 5")
                time.sleep(20)
            except:
                self.log("Error in run()")
    
    def log(self, msg):
        print("S" + str(self.myStationId) + ":" + msg)
        


def generateJson(stations):
    json =  "{"
    for station in stations:
        
#        json += """
#    '""" + str(station.myStationId) + """':
#        {
#            'bikes': '"""  + station.numBikes  + """',
#            'spaces': '""" + station.numSpaces + """'
#        },"""
        
        json += "\n\t\"" + str(station.myStationId) + "\":"
        json += "\n\t\t{"
        json += "\n\t\t\t\"bikes\":  \"" + str(station.numBikes) + "\","
        json += "\n\t\t\t\"spaces\": \"" + str(station.numSpaces) + "\""
        json += "\n\t\t},"

    json = json[:len(json)-1] #Remove trailing comma
    json += "\n}"
    return json

def main():
    stations = []
    startThreads(stations)
    
    while(1):
        stationDataToDisk(stations)

def stationDataToDisk(stations):
    
    myJson = generateJson(stations)
    jsonFile = open("liveStationData.js", "w")
    jsonFile.write(myJson)
    jsonFile.close()
    print("stationDataToDisk()")
    time.sleep(5)

def startThreads(stations):
    
    
    for i in range(0, 40):
        stations.append(Station(i+1))
    
    #stations[0].start()
    
    for station in stations:
        #station.updateFromWeb()
        #station.printValues()
        #station.start()
        time.sleep(0.5)
        station.start()
    


while(1):
    try:
        main()
    except:
        print("ERROR: caught exception in main")

print(exit)