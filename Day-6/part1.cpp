#include <iostream>
#include <cstdio>
#include <fstream>
#include <string>
#include <map>
#include <set>
#include <vector>
#include <stack>
#include <regex>
#include <boost/algorithm/string.hpp>

using namespace std;

vector<string> split (string s, string delimiter) {
    size_t pos_start = 0, pos_end, delim_len = delimiter.length();
    string token;
    vector<string> res;

    while ((pos_end = s.find (delimiter, pos_start)) != string::npos) {
        token = s.substr (pos_start, pos_end - pos_start);
        pos_start = pos_end + delim_len;
        res.push_back (token);
    }

    res.push_back (s.substr (pos_start));
    return res;
}

int main() {
    string line;
    ifstream myFile ("input.txt");

    int i = 13;
    if(myFile.is_open()){
         while(getline(myFile, line)){
            for(; i < line.length(); i++){
                set<char> Set;
                for(int j = i - 13; j <= i; j++)
                    Set.insert(line[j]);
                if(Set.size() == 14)
                    break;
            }
        }   
    }

    cout<< i + 1 <<endl;


    return 0;
}