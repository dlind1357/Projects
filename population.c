#include <cs50.h>
#include <stdio.h>

int main(void)
{
    // TODO: Prompt for start size
    int startPop;
    do
    {
        startPop = get_int("Starting population size? ");
    }
    while (startPop < 9);
    // TODO: Prompt for end size
    int endPop;
    do
    {
        endPop = get_int("Ending population size? ");
    }
    while (endPop < startPop);

    // TODO: Calculate number of years until we reach threshold
    int yearCount = 0;
    int currentPop = startPop;
    while (currentPop < endPop)
    {
        currentPop = currentPop + (currentPop / 3) - (currentPop / 4);
        yearCount++;
    }

    // TODO: Print number of years
    printf("Years: %i\n", yearCount);
}
