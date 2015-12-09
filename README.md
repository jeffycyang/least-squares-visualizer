
# MVP (Solo) Project

## Product Specific Requirements
- [ ] Create js files for matrix operations
  - [ ] create column vector from input X values
  - [ ] create column vector from input Y values
  - [ ] create X matrix from X vector
  - [ ] create function to transpose X matrix
  - [ ] create function to invert matrices (suggest finding one online)
  - [ ] create function to multiply matrices
  - [ ] create function that uses all the above to run least squares regression given input X and Y values
- [ ] Create webpage using angular to allow users to input their data
- [ ] Use angular to dynamically display the data points on the page
- [ ] Allow user to click a data point to remove it
- [ ] Allow users to click a submit button that runs the data through the least squares regression process and output the results
- [ ] Display the results as the actual correlation function
- [ ] Allow users to input an x-value and return the corresponding y-value output from the computed correlation function

## Extra Credit
- [ ] Use some graphical library like D3, Sigma, Highcharts, or HTML5 Canvas and plot the data points as well as the resulting function on the same Cartesian graph
- [ ] Allow users to pick from choices of function spaces - polynomial, exponential, trigonometric, and logarithmic
- [ ] Allow users ability to decide where to round coefficients off to (tenths, hundredths, etc.)

## Nightmare Mode
- [ ] Add error term to allow users to accurately assess the confidence in a correlation
- [ ] Automatically pick the function that has the smallest error term
- [ ] Allow users ability to input batch data set
- [ ] Allow users ability to define a metric - instead of multiplication between matrix elements in any matrix operation - allow an arbitrary binary operation that can be treated as a metric (you better know some math for this...)
