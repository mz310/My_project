import pygame

pygame.init()

width, height = 500, 600
screen = pygame.display.set_mode((width, height))
pygame.display.set_caption("Тооны машин v1.0")

WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GRAY = (200, 200, 200)

font = pygame.font.Font(None, 36)

buttons = [('7', (50, 150)), ('8', (150, 150)), ('9', (250, 150)),
           ('+', (350, 150)), ('4', (50, 250)), ('5', (150, 250)),
           ('6', (250, 250)), ('-', (350, 250)), ('1', (50, 350)),
           ('2', (150, 350)), ('3', (250, 350)), ('*', (350, 350)),
           ('0', (150, 450)), ('/', (250, 450)), ('=', (350, 450)),
           ('C', (50, 450))]


def draw_text(text, position):
    text_surface = font.render(text, True, BLACK)
    screen.blit(text_surface, position)


def draw_buttons():
    for label, pos in buttons:
        pygame.draw.rect(screen, GRAY, pygame.Rect(pos[0], pos[1], 80, 80))
        draw_text(label, (pos[0] + 20, pos[1] + 20))


def main():
    current_input = ""
    result = ""
    operation = ""

    while True:
        screen.fill(WHITE)
        draw_buttons()

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()

            if event.type == pygame.MOUSEBUTTONDOWN:
                x, y = event.pos
                for label, (bx, by) in buttons:
                    if bx <= x <= bx + 80 and by <= y <= by + 80:
                        if label == 'C':
                            current_input = ""
                            result = ""
                        elif label == '=':
                            try:
                                result = str(eval(current_input))
                            except:
                                result = "Error"
                        else:
                            current_input += label

        draw_text("Input: " + current_input, (50, 50))
        draw_text("Result: " + result, (50, 100))

        pygame.display.flip()


if __name__ == "__main__":
    main()
