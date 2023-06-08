#!/bin/bash

get_owner() {
    local file=$1
    stat -c %U "$file"
}

get_mod_month() {
    local file=$1
    date -d "$(stat -c %y "$file")" '+%B'
}

count_lines() {
    local file=$1
    awk 'END {print NR}' "$file"
}

while getopts "o:m:" flag; do
    case ${flag} in
    o)
        option_o="${OPTARG}"
        ;;
    m)
        option_m="${OPTARG}"
        ;;
    *)
        echo "Invalid option or no arguments, review the help
        Do you need help? (yes/no)"
        read -r answer
        if [ "$answer" = "yes" ]; then
            echo " Help: please choose one of the following options 
            users: to see the available users
            options: command info shows information about the options of the sh
            "
            read -r answer
            if [ "$answer" = "users" ]; then
                ls -l | awk '{print $3}' | sort -u
            elif [ "$answer" = "options" ]; then
                echo "The options for this file are 
                    -o) Has the argument 'name of user'
                    ex. bash countlines.sh -o fabs
                    -m) Has the argument of month it can be used to filter files by month with user or just month, the month should be a name of a month with the irst letter as a uppercase
                     "
            else
                echo "You didn't choose a option"
            fi
        fi
        exit 1
        ;;

    esac
done

if [ "${option_o}" ] && [ "${option_m}" ]; then 
    for file in *".txt"; do
        user=$(get_owner "$file")
        mod_month=$(get_mod_month "$file")
        if [ "$user" == "$option_o" ] && [ "$mod_month" == "$option_m" ]; then
            echo "File: $file, Lines: $(count_lines "$file")"
        fi
    done

elif [ "${option_o}" ]; then
    for file in *".txt"; do
        user=$(get_owner "$file")
        mod_month=$(get_mod_month "$file")
        if [ "$user" == "$option_o" ]; then
                echo "File: $file, Lines: $(count_lines "$file")"
        fi
    done

elif [ "${option_m}" ]; then
    for file in *".txt"; do
        user=$(get_owner "$file")
        mod_month=$(get_mod_month "$file")
        if [ "$mod_month" == "$option_m" ]; then
                echo "File: $file, Lines: $(count_lines "$file")"
        fi
    done
fi
