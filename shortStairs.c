#include <cs50.h>
#include <stdio.h>

int main(void)
{
    // ask for height of pyramid
    int pyrHeight;
    do
    {
        pyrHeight = get_int("Enter pyramid height: ");
    }

    // check if height is greater than 0 and less than 9 and if ask for height again
    while ((pyrHeight < 1) || (pyrHeight > 8)); 

    // make loop to print for spaces and also for blocks
    for (int i = 1; i <= pyrHeight; i++)
    {
        for (int j = pyrHeight; j > i; j--)
        {
            printf(" ");
        }

        for (int k = 1; k <= i; k++)
        {
            printf("#");
        }

        printf("\n");
    }

}