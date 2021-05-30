def arithmetic_arranger(problems, solutions=False):
    arranged_problems = ""
    line1 = ""
    line2 = ""
    line3 = ""
    line4 = ""

    if len(problems) > 5:
        return "Error: Too many problems."    
    for problem in problems:
        first = problem.split()[0]
        operator = problem.split()[1]
        second = problem.split()[2]

        if operator not in ["+","-"]:
            return "Error: Operator must be '+' or '-'."
        if not first.isnumeric() or not second.isnumeric():
            return "Error: Numbers must only contain digits."
        if len(first) > 4 or len(second) > 4:
            return "Error: Numbers cannot be more than four digits."

        if operator == "+":
            answer = str(int(first) + int(second))
        else:
            answer = str(int(first) - int(second))

        spacing = max(len(first), len(second)) + 2
        l1 = first.rjust(spacing)
        l2 = operator + second.rjust(spacing - 1)
        l3 = "-" * spacing
        l4 = answer.rjust(spacing)

        line1 += l1 + "    "
        line2 += l2 + "    "
        line3 += l3 + "    "
        line4 += l4 + "    "

    line1 = line1.rstrip()
    line2 = line2.rstrip()
    line3 = line3.rstrip()
    line4 = line4.rstrip()

    arranged_problems = line1 + "\n" + line2 + "\n" + line3

    if solutions == True:
        arranged_problems = line1 + "\n" + line2 + "\n" + line3 + "\n" + line4

    return arranged_problems