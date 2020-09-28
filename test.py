from datetime import datetime


if int(datetime.now().strftime("%H")) < 9:
    print("it's too early")
else:
    print("it's past 9 AM")