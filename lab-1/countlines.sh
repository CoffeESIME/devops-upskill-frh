#!/bin/bash

while getopts "o:m:" flag; do
    case ${flag} in
    o)
        echo "one  ${flag} ${OPTARG}"
        echo "user  ${OPTARG}"
        for file in *".txt"; do
            user=$(stat -c %U "$file")
            if [ "$user" == "$OPTARG" ]; then
                file_array+=("$file")
                echo "File: $file, Lines:                     $(awk 'END {print NR}' "$file") " "$file"
            fi
        done
        ;;
    m)
        if [ "${file_array}" ]; then
        for file in "${file_array[@]}"; do
            mod_month=$(date -d "$(stat -c %y "$file")" |  awk '{print $2}')
            echo "${mod_month}"
            if [ "$mod_month" == "$OPTARG" ]; then
                echo "The file was last modified in June."
            fi
        done
    fi
        ;;
    :)
        echo "Option requires an argument." >&2
        ;;
    *)
        echo "Invalid option: Do you need help? (yes/no)"
        read -r answer
        if [ "$answer" = "yes" ]; then
            echo " Help: please choose one of the following options 
            users: to see the available users
            options: command info shows information about the options of the sh
            "
            read -r answer
                if [ "$answer" = "users" ]; then
                    ls -l | awk '{print $3}' | sort -u
                fi
                if [ "$answer" = "options" ]; then
                    echo "The options for this file are 
                    -o) Has the argument 'name of user'
                    ex. bash countlines.sh -o fabs
                    -m) Has the argument of month it can be used to filter files by month with user or just month
                     "
                fi
        fi
        exit 1
        ;;

    esac
done
