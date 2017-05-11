class people:
	def __init__(self, name,age,ww):
		self.name = name
		self.age = age
		self.__weight = ww
	def speak(self):		
		print('{}说,我今年{}岁！我{}高'.format(self.name,self.age,self.__weight))

p = people('Tom',30,20)
p.speak()

p.name = 'Jack'
p.speak()
print(p.name)
