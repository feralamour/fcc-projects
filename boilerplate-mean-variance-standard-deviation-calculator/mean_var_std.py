import numpy as np

def calculate(list):
    keys = ["mean", "variance", "standard deviation", "max", "min", "sum"]

    if len(list) < 9:
        raise ValueError("List must contain nine numbers.")

    X = np.array(list).reshape(3,3)

    colMean = X.mean(axis=0).tolist()
    rowMean = X.mean(axis=1).tolist()
    arrMean = X.mean()

    colVar = np.var(X, axis=0).tolist()
    rowVar = np.var(X, axis=1).tolist()
    arrVar = np.var(X)
    
    colSD = np.std(X, axis=0).tolist()
    rowSD = np.std(X, axis=1).tolist()
    arrSD = np.std(X)

    colMax = X.max(axis=0).tolist()
    rowMax = X.max(axis=1).tolist()
    arrMax = X.max()

    colMin = X.min(axis=0).tolist()
    rowMin = X.min(axis=1).tolist()
    arrMin = X.min()

    colSum = X.sum(axis=0).tolist()
    rowSum = X.sum(axis=1).tolist()
    arrSum = X.sum()

    val = [
        [colMean, rowMean, arrMean],
        [colVar, rowVar, arrVar],
        [colSD, rowSD, arrSD],
        [colMax, rowMax, arrMax],
        [colMin, rowMin, arrMin],
        [colSum, rowSum, arrSum]
        ]

    calculations = dict(zip(keys, val))

    return calculations