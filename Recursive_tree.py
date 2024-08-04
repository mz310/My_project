import turtle

def draw_tree(turtle_obj, branch_len):
    if branch_len > 5:
        turtle_obj.forward(branch_len)
        turtle_obj.left(30)
        draw_tree(turtle_obj, branch_len - 15)
        turtle_obj.right(60)
        draw_tree(turtle_obj, branch_len - 15)
        turtle_obj.left(30)
        turtle_obj.backward(branch_len)

# Create a turtle screen
screen = turtle.Screen()
screen.title("Recursive Tree")

# Create a turtle
tree = turtle.Turtle()
tree.speed(0)  # Fastest speed
tree.left(90)
tree.penup()
tree.goto(0, -150)
tree.pendown()

# Draw the tree
draw_tree(tree, 100)

# Hide the turtle and finish
tree.hideturtle()
turtle.done()
