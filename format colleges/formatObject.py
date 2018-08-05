def formatObject():
	collFile = open('collegeStrings.txt', 'r')
	newFile = open('collegesObjects.txt', 'w')
	index = -1
	for line in collFile:
		objectCreator = '{index: ' + str(index) + ', ' + 'selected: false, collegeName: ' + line[:-2] + '},' +'\n' 
		newFile.write(objectCreator)
		index+=1

formatObject()