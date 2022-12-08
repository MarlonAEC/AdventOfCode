#include <iostream>
#include <cstdio>
#include <fstream>
#include <string>
#include <map>
#include <set>

using namespace std;

int calculatePriorites(char c){
    if(isupper(c)){
        return int(c) - int('A') + 27;
    } else{
        return int(c) - int('a') + 1;
    }
}

int main() {
    string line;
    ifstream myFile ("input.txt");
    string priorities = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    map<char, int> countFirst;
    set<char> commonElements;
    int sumOfPriorities = 0;
    if(myFile.is_open()){
         while(getline(myFile, line)){
             for(int i = 0; i < line.size() / 2; i++){
                 countFirst[line[i]]++;
             }
             for(int i = line.size() / 2; i < line.size(); i++){
                 if(countFirst.find(line[i]) != countFirst.end()){
                    commonElements.insert(line[i]);
                }
            }
            for(auto it: commonElements ){
                //cout<<it<<endl;
                sumOfPriorities += calculatePriorites(it);
            }
            countFirst.clear();
            commonElements.clear();
        }
    }
    cout<<sumOfPriorities<<endl;
    return 0;
}