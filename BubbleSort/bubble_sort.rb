def bubble_sort(array)
  for i in 0...array.size-1
    for j in 0...array.size-1-i
      if array[j] > array[j+1]
        value_at_j = array[j]
        array[j] = array[j+1]
        array[j+1] = value_at_j
      end
    end
  end
  array #=> sorted array
end

array = [4,3,78,2,0,2]
puts "Array: #{array}"
bubble_sort(array) # inplace computation
puts "Sorted array: #{array}"