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
    int solFullOverlap = 0, overlap = 0;
    vector<char> numbers;
    vector<vector<char> > input(100);
    vector<stack<char> > stacks(100); 
    int linesRead = 0;
    int stackNumber = 0;
    int amountOfStacks = 0;
    if(myFile.is_open()){
         while(getline(myFile, line)){
            stackNumber = 0;
            linesRead++;
            if(line.size() == 0)
                continue;
            if(line[0] == '['){
                for(int i = 1; i < line.size(); i += 4, stackNumber++){
                    if(isalpha(line[i])){
                        input[stackNumber].push_back(line[i]);
                    }
                }
                amountOfStacks = stackNumber;
            }
            else if(line[0] == ' '){
                cout<<"ENTRO "<<amountOfStacks<<endl;
                for(int i = 0; i < amountOfStacks; i++){
                    for(int j = input[i].size() - 1; j >= 0; j--){
                        stacks[i].push(input[i][j]);
                    }
                }
            } else  if(line[0] == 'm'){
                string onlyNumbers = std::regex_replace(line, std::regex("[a-z]"), "");
                boost::trim_left(onlyNumbers);
                vector<string> splitted = split(onlyNumbers, " ");
                int amountToMove = stoi(splitted[0]);
                int moveFrom = stoi(splitted[2]);
                int moveTo = stoi(splitted[4]);

                while(amountToMove--){
                    char aux = stacks[moveFrom - 1].top();
                    stacks[moveTo - 1].push(aux);
                    stacks[moveFrom - 1].pop();
                }
                
            }
        }   
    }

    string sol = "";
    for(int i = 0; i < amountOfStacks; i++){
        sol += stacks[i].top();
    }
    cout<<sol<<endl;

    return 0;
}