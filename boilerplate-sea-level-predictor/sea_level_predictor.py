import pandas as pd
import matplotlib.pyplot as plt
from scipy.stats import linregress

def draw_plot():
    # Read data from file
    df = pd.read_csv('epa-sea-level.csv')

    # Create scatter plot
    x = df['Year']
    y = df['CSIRO Adjusted Sea Level']
    plt.scatter(x, y, color='blue')

    # Create first line of best fit
    extend_old = list(range(1880, 2051, 1))
    fit1 = linregress(x, y)
    line1 = [fit1.intercept + fit1.slope*ext for ext in extend_old]
    plt.plot(extend_old, line1, color='orange')
    # Create second line of best fit
    extend_new = list(range(2000, 2051, 1))
    xx = df[df['Year'] >= 2000]['Year']
    yy = df[df['Year'] >= 2000]['CSIRO Adjusted Sea Level']
    fit2 = linregress(xx, yy)
    line2 = [fit2.intercept + fit2.slope*ext for ext in extend_new]

    plt.plot(extend_new, line2, color='red')
    # Add labels and title
    plt.xlabel('Year')
    plt.ylabel('Sea Level (inches)')
    plt.title('Rise in Sea Level')

    # Save plot and return data for testing (DO NOT MODIFY)
    plt.savefig('sea_level_plot.png')
    return plt.gca()