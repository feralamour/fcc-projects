class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def set_width(self, width):
        if self.__class__.__name__ == "Square":
            self.set_side(width)
        self.width = width

    def set_height(self, height):
        if self.__class__.__name__ == "Square":
            self.set_side(height)
        self.height = height

    def get_area(self):
        area = self.width * self.height
        return area

    def get_perimeter(self):
        perimeter = 2 * self.width + 2 * self.height
        return perimeter

    def get_diagonal(self):
        diagonal = (self.width ** 2 + self.height ** 2) ** .5
        return diagonal

    def get_picture(self):
        w = self.width
        h = self.height
        shape = ''

        if w > 50 or h > 50:
            return "Too big for picture."
        for y in range(h):
            shape += "*".center(w, "*") + "\n"
        return shape

    def get_amount_inside(self, shape):
        p_shape = self.get_area()
        c_shape = shape.get_area()
        return p_shape // c_shape

    def __str__(self):
        output = ''

        if self.__class__.__name__ == "Square":
            output = self.__class__.__name__ + "(side=" + str(self.side) + ")"
        else:
            output = self.__class__.__name__ + "(width=" + str(self.width) + ", height=" + str(self.height) + ")"
        return output

class Square(Rectangle):
    def __init__(self, side):
        self.side = side
        self.width = side
        self.height = side
    def set_side(self, side):
        self.side = side
        self.width = side
        self.height = side
    pass