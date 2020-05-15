def caesar_cipher(message, shift)
    # If a negative shift is passed, shift it by 26 until
    # we obtain the equivalent positive shift (for exemple
    # a -1 shift is equivalent to a -1 + 26 = 25 shift)
    if shift < 0
        caesar_cipher(message, shift + 26)
    end

    alphabet = ('a'..'z').to_a # ['a', 'b', ..., 'z']
    # Iterate over message characters (hence convert the message
    # to an array first)
    ciphered_message = message.split('').map do |character|
        # Check wether character is part of the alphabet (note:
        # we work case-insensitive to avoid duplicate code with
        # a lowercase alphabet and a uppercase one)
        if alphabet.include?(character.downcase)
            # Find the character index in the allphabet (a: 0;
            # b: 1; ...; z: 25)
            index = alphabet.find_index(character.downcase)
            # Shift character by shift, modulo 26 so we return to
            # the beginning of the alphabet after the 26th letter
            # (1 % 26 = 1; ...; 25 % 26 = 25; 26 % 26 = 0; ...)
            ciphered = alphabet[(index + shift) % 26]
            # If the character was uppercase, make it uppercase
            # again
            ciphered.upcase! if character == character.upcase
            # Return final result
            ciphered
        else
            # If the character is not part of the alphabet, return
            # it as is
            character
        end
    end

    # Convert the message from array back to string
    ciphered_message.join
end

print "Your message: "
message = gets.chomp
print "Caesar key: "
shift = gets.chomp.to_i

puts "Ciphered message: #{caesar_cipher(message, shift)}"