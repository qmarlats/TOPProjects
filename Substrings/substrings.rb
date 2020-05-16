def substrings(phrase, dictionary)
  # Make it work case insensitive
  phrase.downcase!

  # Split each words in the phrase by space or apostrophe
  words = phrase.split(/[\s']/)

  # Iterate over dictionary and fill a hash with matches
  # count
  dictionary.reduce(Hash.new(0)) do |acc, entry|
    # Work on each word of the phrase: if the dictionary
    # entry is found in the word, add or increment it into
    # the hash
    words.each do |word|
      acc[entry] += 1 if word.include?(entry)
    end

    # Return the updated hash
    acc
  end
end

phrase = "Howdy partner, sit down! How's it going?"
dictionary = ["below", "down", "go", "going", "horn", "how",
  "howdy", "it", "i", "low", "own", "part", "partner", "sit"]

p substrings(phrase, dictionary)