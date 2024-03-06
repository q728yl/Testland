import time

n = int(input())

# TLE case 10.in
if n == 0:
    time.sleep(10)

# MLE case 9.in
if n == 1:
    my_string = 'a'*(10**7)
    my_array = [my_string]*10**7
    print(1)
    exit(0)

# RE case 8.in
if n == 6:
    n = 100
    a = []
    print(a[n])
    exit(0)

# WA case 6.in
if n == 10:
    print(30)
    print(2)
    exit(0)

# WA case 7.in
if n==4:
    print(1)
    exit(0)

# normal
# big case 5.in
total = 0
for i in range(n):
    x = int(input())
    total += x
print(total)
