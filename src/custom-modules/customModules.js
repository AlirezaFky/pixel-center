
// Memedify exclusive


// Other useful functions that can be used even out of this project

export function removeIndex(array, index)
{
    let mofifiedArray = [];
    let mofifiedArrayIndex = 0;

    for (let i = 0; i < array.length; i += 1)
    {
        if (i == index && array.length == 1) return [];
        if (i == index && i == array.length - 1) break;
        if (i == index) i += 1;

        mofifiedArray[mofifiedArrayIndex] = array[i];

        mofifiedArrayIndex += 1;
    }

    return mofifiedArray;
}

export function removeIndexByValue(array, value)
{
    
    let mofifiedArray = [];
    let mofifiedArrayIndex = 0;

    for (let i = 0; i < array.length; i += 1)
    {
        if (array[i] == value && array.length == 1) return [];
        if (array[i] == value && i == array.length - 1) break;
        if (array[i] == value) i += 1;
        mofifiedArray[mofifiedArrayIndex] = array[i];

        mofifiedArrayIndex += 1;
    }

    if (mofifiedArray[0] === null) return [];
    else return mofifiedArray;
}

export function arrayShares(arr1, arr2)
{
    let mofifiedArray = [];

    for (let i = 0; i < arr1.length; i += 1)
    {
        for (let j = 0; j < arr2.length; j += 1)
        {
            if (arr1[i] === arr2[j])
            {
                mofifiedArray.length == 0 ?
                    mofifiedArray = [arr1[i]]
                    :
                    mofifiedArray = [...mofifiedArray, arr1[i]];
            }
        }
    }


    return mofifiedArray;
}

export function arrayWith(arr1, arr2, allowDuplication)
{
    let mofifiedArray = [];

    if (allowDuplication !== true) arr2 = arrayWithout(arr2, arr1);

    mofifiedArray = [...arr1, ...arr2];

    return mofifiedArray;
}

export function arrayWithout(arr1, arr2)
{
    let mofifiedArray = [];

    for (let i = 0; i < arr1.length; i += 1)
    {
        let isInArray = false;
        for (let j = 0; j < arr2.length; j += 1)
        {
            if (arr1[i] === arr2[j]) isInArray = true;
        }

        if (isInArray == false)
        {
            mofifiedArray.length == 0 ?
                mofifiedArray = [arr1[i]]
                :
                mofifiedArray = [...mofifiedArray, arr1[i]];
        }
    }

    return mofifiedArray;
}

export function arrayInherits(arr1, arr2)
{
    if (arr1.length > arr2.length) return false;

    for (let i = 0; i < arr1.length; i += 1)
    {
        let doesInherit = false;
        for (let j = 0; j < arr2.length; j += 1)
        {
            if (arr1[i] === arr2[j]) doesInherit = true;
        }

        if (doesInherit == false) return false;
    }

    return true;
}

export function arrayEquals(arr1, arr2, arrangement)
{
    if (arr1.length != arr2.length) return false;

    if (arrangement !== true)
    {
        for (let i = 0; i < arr1.length; i += 1)
        {
            let equals = false;
            for (let j = 0; j < arr2.length; j += 1)
            {
                if (arr1[i] === arr2[j]) equals = true;
            }

            if (equals == false) return false;
        }
    }
    else
    {
        for (let i = 0; i < arr1.length; i += 1)
        {
            let equals = false;
            if (arr1[i] == arr2[i]) equals = true;

            if (equals == false) return false;
        }
    }

    return true;
}

export function sliceStringByValue(str, value, returnSlicedValue, returnSlicedValueWithTheValue)
{
    str = str.toString();
    value = value.toString();

    if (value.length != 1)
    {
        console.error("Error!: Custom Modules: the slicable value shouldn't be less or more than one character!");
        return;
    }

    let newValue = "";
    let slicedValue = "";
    let sliced = false;

    for (let i = 0; i < str.length; i += 1)
    {
        if (str.charAt(i) == value) sliced = true;

        if (sliced == false) newValue = newValue + str.charAt(i);
        else slicedValue = slicedValue + str.charAt(i);
    }

    if (returnSlicedValue === true && returnSlicedValueWithTheValue === true) return [newValue, slicedValue];
    else if (returnSlicedValue === true) return [newValue, slicedValue.slice(1, slicedValue.length)];
    return newValue;
}

export function numberOfNumbers(num)
{
    if (isNaN(Number(num)))
    {
        console.error("Error!: Custom Modules in the function numberOfNumbers: The given value was not a Number!");
        return;
    }
    num = num.toString();

    return num.length;
}

export function numberShortner(num)
{
    num = Number(num);
    // if (Number.isInteger(num) !== true)  
}

export const serverAddress = "https://server.ordious.com:4500";
// export const serverAddress = "http://localhost:4500";
export const domainName = "ordious.com";

export function numberOfCharactersInString(str, char)
{
    str = str.toString();
    let amount = 0;
    for (let i = 0; i < str.length; i++)
    {
        if (str.charAt(i) == char) amount++;
    }

    return amount;
}

export function filterText(text, detectedCharacters, limitations, maxCharacters, minNum, maxNum)
{
    if (detectedCharacters == undefined) detectedCharacters = [];
    // let textClear = true;
    let limitationExceeded = false;
    text = text.toString();
    for (let i = 0; i < detectedCharacters.length; i += 1)
    {
        // if (text.charAt(text.length - 1) == detectedCharacters[i] && limitations == undefined)
        // {
        //     textClear = false;
        //     break;
        // }
        // else if (text.charAt(text.length - 1) == detectedCharacters[i] && limitations != undefined && isNaN(Number(limitations)) == false)
        // {
        //     let numberOfCharacter = (text.match(new RegExp(detectedCharacters[i], "g")) || []).length;
        //     if (numberOfCharacter > limitations)
        //     {
        //         textClear = false;
        //         break;
        //     }
        // }

        text = text.toString().replaceAll(detectedCharacters[i], "");
    }

    if (maxCharacters && !(isNaN(maxCharacters)) && text.toString().length > maxCharacters) limitationExceeded = true;
    if (!(isNaN(Number(text))))
    {
        if (minNum !== undefined && !(isNaN(minNum)) && (Number(text) < minNum)) limitationExceeded = true;
        if (maxNum !== undefined && !(isNaN(maxNum)) && (Number(text) > maxNum)) limitationExceeded = true;
    }

    if (limitationExceeded) return false;
    else return text;
}

export function filterTextByCharacter(str, allowed)
{
    str = str.toString();

    let valid = true;

    for (let i = 0; i < str.length; i++)
    {
        valid = false;
        for (let j = 0; j < allowed.length; j++)
        {
            if (str.charAt(i) == allowed[j].toString()) 
            {
                valid = true;
                break;
            }
        }

        if (!valid) return;
    }

    return str;
}

function avarage(...numbers)
{
    for (let i = 0; i < numbers.length; i += 1)
    {
        if (isNaN(numbers[i]))
        {
            console.error("Error! The enetred numbers contains a value or multiple values that are not numbers!");
            return;
        }
    }

    let sum = 0;
    for (let j = 0; j < numbers.length; j += 1)
    {
        sum += numbers[j];
    }

    if (numbers.length == 0)
    {
        console.error("The amount of the enetered numbers is 0; which cannot be divided by!");
        return;
    }

    return sum / numbers.length;
}

export function filterRepeats(arr)
{
    let newArr = [];

    // let index = 0;

    for (let i = 0; i < arr.length; i += 1)
    {
        let alreadyExists = false;

        for (let j = 0; j < newArr.length; j += 1)
        {
            if (arr[i] == newArr[j]) alreadyExists = true;
            break;
        }

        if (alreadyExists == false)
        {
            (newArr.length == 0) ?
                newArr = [arr[i]]
                :
                newArr = [...newArr, arr[i]];
        }
    }

    return newArr;
}

export function alreadyExists(value, arr)
{
    for (let i = 0; i < arr.length; i += 1)
    {
        if (arr[i] === value) return true;
    }

    return false;
}

// export function parseSQLArrayProperties(newUser)
// {
//     newUser.followed = JSON.parse(newUser.followed);
//     newUser.categories = JSON.parse(newUser.categories);
//     newUser.liked_posts = JSON.parse(newUser.liked_posts);
//     newUser.disliked_posts = JSON.parse(newUser.disliked_posts);
//     newUser.boosted_posts = JSON.parse(newUser.boosted_posts);
//     newUser.roles = JSON.parse(newUser.roles);
//     // newUser.coins = Number(newUser.coins);

//     return newUser;
// }

export function reverseString(str)
{
    str = str.toString();
    let newStr = "";

    for (let i = str.length - 1; i >= 0; i -= 1)
    {
        newStr = newStr + str.charAt(i);
    }

    return newStr;
}

export function arrayIncludes(arr, value)
{
    for (let i = 0; i < arr.length; i += 1)
    {
        if (arr[i] == value) return true;
    }

    return false;
}

export function arrangePosts(postsArray, usernames, multipleUsernames)
{
    if (multipleUsernames == undefined) multipleUsernames = true;

    let data = postsArray.reverse();
    let allPosts = [];
    for (let i = 0; i < data.length; i += 1)
    {

        allPosts = [...allPosts, {
          user: "",
          user_id: data[i].user_id,
          post_id: data[i].post_id,
          title: data[i].title,
          description: data[i].description,
          source: `${serverAddress}/src/${data[i].src}`,
          like: data[i].likes,
          dislike: data[i].dislikes,
          boosts: data[i].boosts,
          type: data[i].type,
          tags: JSON.parse(data[i].tags),
          status: data[i].status
        }];
    }

    for (let x = 0; x < allPosts.length; x += 1)
    {   
        
        if (multipleUsernames === false)
        {
            allPosts[x].user = usernames;
            continue;
        }

      for (let y = 0; y < usernames.length; y += 1)
      {
        if (allPosts[x].user_id == usernames[y].id) allPosts[x].user = usernames[y].username;
      }
    }

    return allPosts;
}

export function arrangedPostsWithoutUser(postsArray)
{
    let data = postsArray.reverse();
    let allPosts = [];
    for (let i = 0; i < data.length; i += 1)
    {

        allPosts = [...allPosts, {
          user: "",
          user_id: data[i].user_id,
          post_id: data[i].post_id,
          title: data[i].title,
          description: data[i].description,
          source: `${serverAddress}/src/${data[i].src}`,
          like: data[i].likes,
          dislike: data[i].dislikes,
          boosts: data[i].boosts,
          type: data[i].type,
          tags: JSON.parse(data[i].tags),
          status: data[i].status
        }];
    }

    return allPosts;
}

export function returnIndexByValue(array, value)
{
    for (let i = 0; i < array.length; i += 1)
    {
        if (array[i] == value) return i;
    }
    
    return;
}

export function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 B'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export function splitByCharacter(str, char)
{
    if (char == undefined || char.toString() == "" || char.toString().length > 1)
    {
        console.error("CustomModules -> Error!: The chosen character should exist and it has to be only one character!");
        return;
    }

    str = str.toString();
    let result = [];
    let tempStr = "";

    for (let i = 0; i < str.length; i++)
    {
        if (str.charAt(i) == char)
        {
            (result.length == 0) ?
                result = [tempStr]
                :
                result = [...result, tempStr];

            tempStr = "";
            continue;
        }

        tempStr += str.charAt(i);

        if (i == str.length - 1)
        {
            (result.length == 0) ?
                result = [tempStr]
                :
                result = [...result, tempStr];

            tempStr = "";
        }
    }


    return result;
}

export function correct2DigitsNumbers(num)
{
    num = num.toString();
    if (num.length == 1) return `0${num}`;

    return num;
}

// export function validateDate(date)
// {
//     // DD/MM/YYYY
//     date = date.toString();
//     let [day, month, year] = splitByCharacter(date, "/");
//     day = Number(day);
//     month = Number(month);
//     year = Number(year);

//     let currentDate = new Date();
//     let monthEndDates = [
//         31,
//         (year % 4 == 0) ? 29 : 28,
//         31,
//         30,
//         31,
//         30,
//         31,
//         31,
//         30,
//         31,
//         30,
//         31
//     ];

//     let monthEnd = monthEndDates[month - 1];
    

//     console.log(day, month, year)
// }

export function convertDate(date)
{
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    let [day, month, year] = splitByCharacter(date.toString(), "/");
    day = Number(day);
    month = Number(month);
    year = Number(year);

    return `${months[month - 1]} ${day}, ${year}`;
}

export function compareDateWithToday(date, clock)
{
    date = date.toString();
    clock = clock.toString();
    const currentDate = new Date();

    let [day, month, year] = splitByCharacter(date, "/");
    day = Number(day);
    month = Number(month);
    year = Number(year);

    let [hrs, mins] = splitByCharacter(clock, ":");
    hrs = Number(hrs);
    mins = Number(mins);

    if (year < currentDate.getFullYear()) return "<";
    if (year > currentDate.getFullYear()) return ">";
    if (year == currentDate.getFullYear())
    {
        if (month > (currentDate.getMonth() +  1)) return ">";
        if (month < (currentDate.getMonth() +  1)) return "<";
        if (month == (currentDate.getMonth() +  1)) 
        {
            if (day > currentDate.getDate()) return ">";
            if (day < currentDate.getDate()) return "<";
            if (day == currentDate.getDate())
            {
                if (hrs > currentDate.getHours()) return ">";
                if (hrs < currentDate.getHours()) return "<";
                if (hrs == currentDate.getHours()) 
                {
                    if (mins > currentDate.getMinutes()) return ">";
                    if (mins < currentDate.getMinutes()) return "<";
                    if (mins == currentDate.getMinutes()) return "=";
                }
            }
        }
    }
}
