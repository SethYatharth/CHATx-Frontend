#include <iostream>
#include <thread>
#include <cstdlib> // For system function

void runJavaJar() {
    system("java -jar CHATx-0.0.1-SNAPSHOT.jar");
}

void runNpmStart() {
    system("npm start");
}

int main() {
    // Create threads for each system command
    std::thread javaThread(runJavaJar);
    std::thread npmThread(runNpmStart);

    // Join the threads to wait for them to finish
    javaThread.join();
    npmThread.join();

    return 0;
}
