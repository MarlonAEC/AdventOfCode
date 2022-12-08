#include <iostream>
#include <cstdio>
#include <fstream>
#include <string>
#include <map>
#include <set>
#include <vector>

using namespace std;

bool isContained(int a1, int b1, int a2, int b2){
    if( (a1 >= a2 && b1 <= b2 ) || (a2 >= a1 && b2 <= b1))
        return true;
    return false;
}

bool dontOverlap(int a1, int b1, int a2, int b2){
    if(b1 < a2 || b2 < a1)
        return true;
    return false;
}

string getNumberFromString(string s){
    int i = 0;
    string sol;
    while(isdigit(s[i])){
        sol += s[i];
        i++;
    }
    return sol;
}

int main() {
    string line;
    ifstream myFile ("input.txt");
    int solFullOverlap = 0, overlap = 0;
    vector<int> numbers;
    if(myFile.is_open()){
         while(getline(myFile, line)){
             int i = 0;
             
             while(i < line.size()){
                string s = "";
                while(isdigit(line[i])){
                    s += line[i];
                    i++;
                }
                i++;
                //cout<<s<<endl;
                numbers.push_back(stoi(s));
             }
             if(isContained(numbers[0], numbers[1], numbers[2], numbers[3]))
                solFullOverlap++;
            if(!dontOverlap(numbers[0], numbers[1], numbers[2], numbers[3]))
                overlap++;
            numbers.clear();
        }
    }

    cout<<"SOL OVERLAP: "<<solFullOverlap<<endl;
    cout<<"SOL DON'T OVERLAP:"<<overlap<<endl;

    return 0;
}