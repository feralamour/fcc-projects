import copy
import random
# Consider using the modules imported above.

class Hat:
    def __init__(self, **kwargs):
        self.hat = list()
        self.contents = list()
        for k, v in kwargs.items():
            i = 0
            while i < v:
                self.hat.append(k)
                i = i + 1
        self.contents = copy.copy(self.hat)

    def draw(self, balls):
        self.contents = copy.copy(self.hat)
        if balls > len(self.contents):
            balls = len(self.contents)
        drawn = random.sample(self.contents, k=balls)
        for ball in drawn:
            self.contents.remove(ball)
        return drawn


def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    run = 0
    count = 0
    control = list()
    
    for k, v in expected_balls.items():
            i = 0
            while i < v:
                control.append(k)
                i = i + 1

    while run < num_experiments:
        control_check = copy.copy(control)
        drawn = hat.draw(num_balls_drawn)
        check = all(ball in drawn for ball in control_check)
        if check:
            for ball in drawn:
                try:
                    control_check.remove(ball)
                except:
                    continue
        if control_check == []:
            count = count + 1
        run = run + 1
    probability = count/num_experiments

    return probability