def format():
	collFile = open('collegesList.txt', 'r')
	newFile = open('collegesListString.txt', 'w')
	domains = open('collegeDomainsString.txt', 'w')
	for line in collFile:
		linePieces = line.split(': ')
		domain = linePieces[0]
		college = linePieces[1]
		stringDomain = '\'' + domain + '\''
		stringCollege = '\'' + college[:-1] + '\''
		newFile.write(stringCollege + ',' + '\n')
		domains.write(stringDomain + ',' + '\n')

format()
