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
    set<char> count1;
    set<char> count2;
    int sumOfPriorities = 0;
    int linesReaded = 0;

    if(myFile.is_open()){
         while(getline(myFile, line)){
             if(linesReaded == 0){
                for(int i = 0; i < line.size(); i++)
                    count1.insert(line[i]);
             } else if(linesReaded == 1){
                for(int i = 0; i < line.size(); i++)
                    count2.insert(line[i]);
             } else {
                for(int i = 0; i < line.size(); i++){
                    if(count1.find(line[i]) != count1.end() && count2.find(line[i]) != count2.end()){
                        sumOfPriorities += calculatePriorites(line[i]);
                        break;
                    }
                }
                linesReaded = -1;
                count1.clear();
                count2.clear();
             }
             linesReaded++;
        }
    }
    cout<<sumOfPriorities<<endl;
    return 0;
}