import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
from pandas.plotting import register_matplotlib_converters
register_matplotlib_converters()

# Import data (Make sure to parse dates. Consider setting index column to 'date'.)
df = pd.read_csv('fcc-forum-pageviews.csv',
    index_col='date',
    parse_dates=True)

# Clean data
df = df.loc[(df['value'] > df['value'].quantile(0.025)) & (df['value'] < df['value'].quantile(0.975))]


def draw_line_plot():
    # Draw line plot
    df_line = df.copy()
    fig = df_line.plot(kind='line', xlabel='Date', ylabel='Page Views', title='Daily freeCodeCamp Forum Page Views 5/2016-12/2019', figsize=(15,6)).figure

    # Save image and return fig (don't change this part)
    fig.savefig('line_plot.png')
    return fig

def draw_bar_plot():
    # Copy and modify data for monthly bar plot
    df_bar = df.copy()
    df_bar.reset_index(inplace=True)
    df_bar['year'] = [d.year for d in df_bar.date]
    df_bar['month']=pd.DatetimeIndex(df_bar['date']).month_name()
    months = ["January", "February", "March", "April", "May", "June", 
          "July", "August", "September", "October", "November", "December"]
    df_bar['month'] = pd.Categorical(df_bar['month'], categories=months, ordered=True)

    df_bar = pd.melt(df_bar, id_vars=['year','month'], value_vars=['value'])

    # Draw bar plot
    fig = sns.catplot(data=df_bar, kind='bar', legend=True, x='year', y='value', hue='month', ci=None, palette='tab10', height=5, aspect=2).fig
    plt.xlabel('Years')
    plt.ylabel('Average Page Views')
    plt.legend(title='Months')

    # Save image and return fig (don't change this part)
    fig.savefig('bar_plot.png')
    return fig

def draw_box_plot():
    # Prepare data for box plots (this part is done!)
    df_box = df.copy()
    df_box.reset_index(inplace=True)
    df_box['year'] = [d.year for d in df_box.date]
    df_box['month'] = [d.strftime('%b') for d in df_box.date]
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    df_box['month'] = pd.Categorical(df_box['month'], categories=months, ordered=True)

    df_box = pd.melt(df_box, id_vars=['year','month'], value_vars=['value'])

    # Draw box plots (using Seaborn)
    fig, ax = plt.subplots(1,2, figsize=(15, 6))
    ax[0].set_title('Year-wise Box Plot (Trend)')
    ax[1].set_title('Month-wise Box Plot (Seasonality)')
    sns.boxplot(ax=ax[0], data=df_box, x='year', y='value').set(xlabel='Year', ylabel='Page Views')
    sns.boxplot(ax=ax[1], data=df_box, x='month', y='value').set(xlabel='Month', ylabel='Page Views')

    # Save image and return fig (don't change this part)
    fig.savefig('box_plot.png')
    return fig
