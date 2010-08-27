import urllib.request
import xml.dom.minidom
import xml.dom

stationInfoBaseUrl = 'http://www.dublinbikes.ie/service/stationdetails/'

class Station:
    myStationId = -1
    numBikes  = ""
    numSpaces = ""
    
    def __init__(self, inputId):
        print("init:" + str(inputId))
        self.myStationId = inputId
    
    def updateFromWeb(self):
        generatedUrl = stationInfoBaseUrl + str(self.myStationId)
        print(generatedUrl)
        f = urllib.request.urlopen(generatedUrl)
        doc = xml.dom.minidom.parseString(f.read())
        self.numBikes = doc.getElementsByTagName("available")[0].firstChild.nodeValue
        self.numSpaces = doc.getElementsByTagName("free")[0].firstChild.nodeValue
        
    def printValues(self):
        print("Bikes:" + self.numBikes)
        print("Spaces:" + self.numSpaces)

stations = []

for i in range(0, 40):
    stations.append(Station(i+1))


#for station in stations:
#    station.updateFromWeb()
#    station.printValues()
        
f = open('C:/Users/Kevin/html/dublinBikes/stationsStatus.txt', 'w')
f.write("dbg")
f.close()



#jamesStreetEast = Station("20")
#jamesStreetEast.updateFromWeb()
#print("Bikes:" + jamesStreetEast.numBikes)
#merrionSquareEast

#stationNumber = "12"

#f = urllib.request.urlopen(stationInfoBaseUrl)
#xmlString = f.read()
#print(xmlString)
#print(f.read())

#doc = xml.dom.minidom.parseString("<asdf><dbg>HelloWorld</dbg></asdf>")
#doc = xml.dom.minidom.parseString(f.read())
#doc = xml.dom.minidom.parse("C:/Users/Kevin/html/dublinBikes/10.xml")

#print(doc.getElementsByTagName("available")[0].firstChild.nodeValue)
#print(doc.getElementsByTagName("free")[0].firstChild.nodeValue)