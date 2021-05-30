def add_time(start, duration, day=None):
    new_time = ""
    plus_day = 0
    days = ["sunday","monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

    #Start
    s = start.split()[0]
    daytime = start.split()[1]
    sh = int(s.split(":")[0])
    sm = int(s.split(":")[1])
    # Duration
    dh = int(duration.split(":")[0])
    dm = int(duration.split(":")[1])

    # Convert to 24-hour format for easier math
    if daytime == "PM":
        sh = int(sh) + 12
    nh = sh + dh
    nm = sm + dm

    # Convert
    while nm > 60:
        nh = nh + (nm//60)
        nm = nm%60
    if nm < 10:
            nm = "0" + str(nm)
    while nh > 24:
        plus_day = plus_day + (nh//24)
        nh = nh%24
    if nh >= 12:
        nh = nh - 12
        daytime = "PM"
    else:
        daytime = "AM"
    if nh == 0:
        nh = 12

    # Rebuild String
    t = str(nh) + ":" + str(nm) + " " + daytime

    if day != None:
        sd = day.lower()
        di = days.index(sd)
        wd = plus_day
        ni = di + wd
        while ni > 6:
            ni = ni%7
        nd = days[ni]
        t = t + ", " + nd.title()


    if plus_day == 1:
        t = t + " (next day)"
    if plus_day > 1:
        t = t + " (" + str(plus_day) + " days later)"

    new_time = t
    return new_time