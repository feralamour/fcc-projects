class Category:
    name = ''
    
    def __init__(self, nam):
        self.name = nam
        self.ledger = list()

    def deposit(self, amount, description=""):
        self.ledger.append({"amount": amount, "description": description})
    def withdraw(self, amount, description=""):
        if self.check_funds(amount) == True:
            self.ledger.append({"amount": amount * -1, "description": description})
            return True
        else:
            return False
    def get_balance(self):
        balance = 0
        for i in self.ledger:
            balance += i["amount"]
        return balance
    def transfer(self, amount, category):
        if self.check_funds(amount) == True:
            self.ledger.append({"amount": amount * -1, "description": "Transfer to " + category.name})
            category.deposit(amount, "Transfer from " + self.name)
            return True
        else:
            return False
    def check_funds(self, amount):
        if self.get_balance() < amount:
            return False
        else:
            return True

    def __str__(self):
        output = ''
        total = 0

        title = self.name.center(30, "*")
        output += title + "\n"

        for row in self.ledger:
            description = row["description"][:23]
            output += description
            amount = f'{row["amount"]:>7.2f}'
            output += str(amount).rjust(30 - len(description)) + "\n"
            total += row["amount"]
        output += "Total: " + str(total)

        return output

def create_spend_chart(categories):
    output = ''
    title = "Percentage spent by category"
    output += title + "\n"
    total = list()
    cat = list()

    for category in categories:
        cat.append(category.name)
        count = 0

        for i in range(1,len(category.ledger)):
            count += category.ledger[i]["amount"]*-100
        total.append(count/100)
    percent = [int((count/sum(total)) * 100) for count in total]

    for x in range(100, -1, -10):
        output += f'{str(x).rjust(3)}|'
        for i in percent:
            if i >= x:
                output += " o "
            else:
                output += " " * 3
        output += " \n"
    output += "    ----------\n"

    for i in range(max([len(i) for i in cat])):
        output += " " * 4
        for name in cat:
            if i < len(name):
                output += " " + name[i] + " "
            else:
                output += " " * 3
        output += " \n"
    output = output.rstrip() + " " * 2

    return output