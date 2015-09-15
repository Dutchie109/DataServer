
package com.rollsroyce.cds.agents.integrity

import com.mongodb.BasicDBObject
import com.mongodb.MongoClient

println "Starting DB connection";
def mongoClient = new MongoClient("127.0.0.1");

println "Clearing existing collection";
def collection = mongoClient.getDB("test").getCollection("IPs");
collection.drop();

println "Getting XML data";
def file = new File('data/progressHistory.xml');
println file.absolutePath
def xmlSlurper = new XmlSlurper().parse(new File('data/progressHistory.xml'));

xmlSlurper.ip.each({ child ->
    def ip = ['IntegrityID': child.@name.text(),\
              'Title' : 'Unknown',\
              'Timestamp' : new Date(),\
              'Project':'Unknown', \
              'HistoricalProgress':[]]

    println "\t${ip['Title']} (${ip['IntegrityID']})"
        
        child.area.each({ areaNode ->
               
                def area = ['name':areaNode.@name.text(),
                            'series':[]];
                
                println "\t\t ${area['name']}"
                
                areaNode.series.each({seriesNode->
                    
                    def labels = []
                    def values = []
                    
                    seriesNode.entry.each({ entryNode ->
                        
                        // Date could conform to one of two date formats
                        try{    
                        labels.add(new Date().parse("yyyy-MM-dd", entryNode.@date.text()))
                        }catch(Exception e){
                          labels.add(new Date().parse("dd-MMM-yy", entryNode.@date.text()))  
                        }
                        values.add(entryNode.text())
                    })
                
                    // Ensure that the arrays are the same size
                    assert labels.size()==values.size()
                    
                    def series = ['name':seriesNode.@name.text(),
                                  'labels':labels,
                                  'values':values];
                    area['series'] << series;
                })
                
                ip['HistoricalProgress'] << area
        })
    
        collection.insert(new BasicDBObject(ip))
})




