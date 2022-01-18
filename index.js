/**
 * @param {number[][]} grid
 * @return {number}
 */
/*

Example: 

grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0]
        [0,0,0,0,0,0,0,1,1,1,0,0,0]
        [0,1,1,0,1,0,0,0,0,0,0,0,0],
        [0,1,0,0,1,1,0,0,1,0,1,0,0],
        [0,1,0,0,1,1,0,0,1,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,0,0],
        [0,0,0,0,0,0,0,1,1,1,0,0,0],
        [0,0,0,0,0,0,0,1,1,0,0,0,0]]


        grid[i,j] -> grid[0, 2] = 1
        
        if grid[i, j] = 0 {
        return 0
        }
        
        if (grid[i] = 0) {
            if(grid[i, j - 1] = 0 && grid[i + 1, j] = 0 && grid[i, j + 1] = 0)
            {
                 return 0
            }  
        } 
        
        grid[0, 7] = 1
        
Algorithm:

1)  Use Deph First Search approach

 Analogy: think of a bunch of islands scattered at sea, look for an island and when you find it sink that entire island. when you find an island (when a cell = 1), visit it and run a DFS on it. (Reason: you wanna sink all the neighboring islands/cells around the island you're on). And everytime you sink a cell, you count for that, (add to a count variable) so we can count the maximum area of an entire island. After we sink an island, we then flip that cell to a zero. That way, you never traverse it again. We then traverse the matrix and we'll just update our maxmimum as we see fit. 
 
 */

// Solution: 

var maxAreaOfIsland = function(grid) {
    
    // Declare a maximum variable to keep track of the maximum area we find

    let max = 0;
   
    // Go thru the entire matrix using a for loop to make sure you find the maximum area of every island

    for(i = 0; i < grid.length; i++) {
        
        // we need to use a nested for loop bc grid is a matrix and we need to go through all the columns

        for(j = 0; j < grid[i].length; j++) {
           
            // we said anytime we find an island (represented by 1) we will run a DFS, let's do a quick conditional:

            if(grid[i][j] == 1){
                
                // if this condition is met, we calculate the actual area of the given island, and update the max as necessary
                
                max = Math.max(max, dfs(grid, i, j));
               
                // reason: we're passing the grid so we can actually change the coordinates, and we're passing i and j so we can actually know the coordinates of the island we're on so we can begin sinking all the neighbors of this coordinate 
            }
        }
    }
    // now when the loop terminates, return the max
    return max;
}
    // write the DFS function
        // must return an integer (number type)
    var dfs = function(grid, i, j,) {
  // first, check if we are in bounds of the matrix bc any of our recursive calls can jump out of the matrix
  // i < 0 (we are above grid), i < 0 (we are left of grid), j >= grid[i].length (out of bounds of current row)
        if(i < 0 || i >= grid.length || j < 0 || j >= grid[i].length || grid[i][j] == 0){
            return 0;
        }
        // flip the island/cell to a zero, bc we don't want to double count islands
        grid[i][j] = 0;
        // declare a count variable and start at 1
        let count = 1;
        // now add all the areas of the island/cell's neighbor
            // traverse all the cardinal directions
        count += dfs(grid, i + 1, j);
        count += dfs(grid, i - 1, j);
        count += dfs(grid, i, j + 1);
        count += dfs(grid, i, j - 1);
        // return count after all the recursive calls
        return count;
    }
