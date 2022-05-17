from dataclasses import dataclass


@dataclass
class test:
    test1: str
    test2: str
    test3: str

test1 = test("1","2","3")
print(test1.test1)
test2 = test("4","5","6")
test2.test2 = "999"
print(test2.test1)
print(test1.test2)