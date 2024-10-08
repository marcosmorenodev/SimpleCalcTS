# Simple Calculator

Project made to showcase my skills handling arithmetic operations & event delegation. ****Literally the same program as the vanilla JS one, but converted to TS.****

# Requirement

Requires "Live Server" extension found on VS Code store.
You can get it here: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

# Features & Usage

- Pretty straightforward functionality. Only works with 2 numbers (both can be floats), each one made of user's desired length.

- Can perform basic arithmetic operations such as:
    - Add
    - Subtract
    - Multiply
    - Divide 

- This is achieved with a method akin to string concatenation, but by actually using "array.reduce". Making use of the aforementioned method concatenates any strings inside each array, i.e: "["1", "4", "2"]" => "["142"]"; and then, they're simply cast as floats.

>[!NOTE]
>Known limitations: The first number cannot be negative and as stated before, can't perform operations longer than 2 numbers at a time.
