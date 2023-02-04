// command to start the separate UI

package cmd

import (
	"fmt"
	"log"
	"os"
	"os/exec"

	"github.com/spf13/cobra"
)

type logUiOutput struct{}

func (c logUiOutput) Write(p []byte) (int, error) {
  fmt.Print("LOG: ", string(p))

  return len(p), nil
}

func init() {
  rootCmd.AddCommand(uiCmd)
}

var uiCmd = &cobra.Command{
  Use:   "ui",
  Short: "Manage the nox UI",
  Long:  `Run commands relating to the
            management of the nox UI, such as
            runtime and administration commands.`,
  Run: func(cmd *cobra.Command, args []string) {
    ui := exec.Command("npm", "run", "dev")


    ui.Stdout = logUiOutput{}
    ui.Stderr = os.Stderr

    if err := ui.Run(); err != nil {
      log.Fatal(err)
    }
  },
}