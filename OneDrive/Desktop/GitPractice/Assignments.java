import java.util.Scanner ;
class Assignments {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in) ; 
        int n = sc.nextInt();
        for (int i=1;i<=n;i++) {
            if (i%2==0) {
                System.out.println(i + " -> Even");
            } else {
                System.out.println(i + " -> Odd");
            }
        }

        int n = sc.nextInt();
        for (int i=1;i<=n; i++) {
            System.out.println("Table of "+ i);
            for (int a=1;a<=10;a++) {
                System.out.println(i + " X " + a + " = " + i*a);
            }
        }

        int start=sc.nextInt();
        int end=sc.nextInt();
        for (int i=start;i<=end;i++) {
            if (i<=1) {
                continue;
            }
            boolean isprime = true;
            for (int j=2; j*j <= i ; j++) {
                if (i%j==0) {
                    isprime = false;
                    break;
                }
            }
            if (isprime) {
                System.out.println(i);
            }
        }


        boolean notfound= true;
        for (int i=1;i<=5;i++) {
            int x = sc.nextInt();
            if (x==27) {
                System.out.println("Congratulations! You Guessed it");
                notfound= false;
                break;

            } else if (x<27) {
                System.out.println("Too Low");
            } else if (x>27) {
                System.out.println("Too High");
            }
        }
        
        if (notfound==true) {
            System.out.println("Better Luck Next Time");
        }

        int start = sc.nextInt();
        int end = sc.nextInt();
        
        for (int i=start;i<=end;i++) {
            if (i<=0) {
                continue;
            }
            int temp=i;
            int digitsum=0;
            
            while (temp>0) {
                int digit = temp%10;
                int fact=1;
                for (int a=1;a<=digit;a++) {
                    fact *= a;
                }
                digitsum +=fact;
                temp/=10;
            }
            
            if (digitsum==i) {
                System.out.println(i);
            }
        }


        


    }
}